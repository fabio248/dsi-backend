import { AppDataSource } from '../data-source';
import { Especie } from '../db/entity/Especie.entity';

export class SpecieService {
  private specieRepository = AppDataSource.getRepository(Especie);

  async create(input: { name: string }) {
    const newSpecie = Object.assign(new Especie(), input);
    const specie = await this.specieRepository.save(newSpecie);

    return specie;
  }

  async all(): Promise<Array<Especie>> {
    const species: Array<Especie> = await this.specieRepository.find({
      select: { id: true, name: true },
    });

    return species;
  }
}
