import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryUseCase } from "@/http/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryBodySchema.parse(request.body);

  const checkInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await checkInHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkIns });
}
