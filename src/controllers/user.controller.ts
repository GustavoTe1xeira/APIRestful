import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../plugins/prisma'
import bcrypt from 'bcrypt'

export async function getUsers(request: any, reply: FastifyReply) {
  if (request.user.role !== 'admin') return reply.status(403).send()

  const users = await prisma.user.findMany({ where: { deleted: false } })
  return users
}

export async function getUserById(request: any, reply: FastifyReply) {
  const { id } = request.params
  const user = await prisma.user.findUnique({ where: { id: Number(id) } })

  if (!user || (request.user.role !== 'admin' && user.id !== request.user.sub))
    return reply.status(403).send()

  return user
}

export async function updateUser(request: any, reply: FastifyReply) {
  const { address, phone } = request.body
  const user = await prisma.user.update({
    where: { id: request.user.sub },
    data: { address, phone }
  })
  return user
}

export async function adminUpdateUser(request: any, reply: FastifyReply) {
  if (request.user.role !== 'admin') return reply.status(403).send()

  const { id } = request.params
  const { address, phone, role } = request.body

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { address, phone, role }
  })
  return user
}

export async function adminCreateUser(request: any, reply: FastifyReply) {
  if (request.user.role !== 'admin') return reply.status(403).send()

  const { email, password, address, phone, rg, birthDate, role } = request.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      address,
      phone,
      rg,
      birthDate: new Date(birthDate),
      role
    }
  })
  return reply.status(201).send(user)
}