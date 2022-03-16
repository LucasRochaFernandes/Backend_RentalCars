import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids);
  }

  async findByName(name: string): Promise<Specification> {
    const specificationFounded = await this.repository.findOne({ name });
    return specificationFounded;
  }
  async list(): Promise<Specification[]> {
    const all = await this.repository.find();
    return all;
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }
}
