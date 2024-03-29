import { Gym } from "@/models";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymUseCaseParams {
  query: string;
  page: number;
}

interface SearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseParams): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany({
      query,
      page,
    });

    return {
      gyms,
    };
  }
}
