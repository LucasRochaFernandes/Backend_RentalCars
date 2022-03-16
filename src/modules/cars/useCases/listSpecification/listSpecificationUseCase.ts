import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
export class ListSpecificationUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(
    @inject("SpecificationRepository")
    specificationRepository: ISpecificationRepository
  ) {
    this.specificationRepository = specificationRepository;
  }

  async execute(): Promise<Specification[]> {
    const all = await this.specificationRepository.list();
    return all;
  }
}
