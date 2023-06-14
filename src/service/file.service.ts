import { CompleteMultipartUploadCommandOutput, S3 } from '@aws-sdk/client-s3';
import { AppDataSource } from '../data-source';
import { File } from '../db/entity/File.entity';
import { v4 as uuid } from 'uuid';
import { config } from '../config';
import { Upload } from '@aws-sdk/lib-storage';
import { petService } from '../utils/dependencies/dependencies';
import { notFound } from '@hapi/boom';

export default class FileService {
  private s3Client: S3;
  private fileRepository = AppDataSource.getRepository(File);

  constructor() {
    this.s3Client = new S3({
      credentials: {
        accessKeyId: config.amazon.accessKey,
        secretAccessKey: config.amazon.secretKey,
      },
      region: config.amazon.region,
    });
  }

  async create(file: Express.Multer.File, petId: number) {
    const pet = await petService.findOne(petId);
    const { medicalHistory, name } = pet;

    if (!pet) {
      throw notFound('pet not found');
    }

    const { Location, Key } = await this.uploadFile(file, name);

    const newFile = await this.fileRepository.save({
      name: Key,
      url: Location,
      medicalHistory: medicalHistory,
    });

    return newFile;
  }

  async uploadFile(file: Express.Multer.File, filename: string) {
    const { buffer, mimetype, originalname } = file;

    const name = `${uuid()}-${filename}.${this.getTypeFile(originalname)}`;

    const upload = new Upload({
      client: this.s3Client,
      params: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Bucket: config.amazon.bucketName,
        Body: buffer,
        Key: name,
        ContentType: mimetype,
        Tagging: 'public=yes',
      },
    });
    const { Location, Key }: CompleteMultipartUploadCommandOutput =
      await upload.done();

    return { Location, Key };
  }

  getTypeFile(origiName: string): string {
    const fileType = origiName.split('.');
    //get the type of file example .png .jpg
    return `${fileType[fileType.length - 1]}`;
  }
}
