import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../ISpecificationRepository";

export class SpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }
  async list(): Promise<Specification[]> {
    return this.specifications;
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();
    Object.assign(specification, { name, description });

    this.specifications.push(specification);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }
}
