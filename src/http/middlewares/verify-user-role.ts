import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVeirfy: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVeirfy) {
      return reply.status(404).send({ message: "Unauthorized" });
    }
  };
}
