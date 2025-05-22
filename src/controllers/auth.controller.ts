import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../plugins/prisma'
import { signInSchema, signUpSchema } from '../schemas/auth.schema'
import bcrypt from 'bcrypt'
import app from '../app'
//create function
export async function signIn(request: FastifyRequest, reply: FastifyReply) {

  const parsed = signInSchema.safeParse(request.body)
  if (!parsed.success) 
    return reply.status(400).send(parsed.error.format())

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.password)))
    return reply.status(401).send({ message: 'Credenciais inválidas' })

  const token = app.jwt.sign({ sub: user.id, role: user.role })
  return { token }
}

//login
export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const parsed = signUpSchema.safeParse(request.body)
  if (!parsed.success) 
    return reply.status(400).send(parsed.error.format())

  const { email, password, address, phone, rg, birthDate } = parsed.data

  const hashedPassword = await bcrypt.hash(password, 10)

//criacao banco de dados
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      address,
      phone,
      rg,
      birthDate: new Date(birthDate),
      role: 'user'
    }
  })
  return reply.status(201).send({ message: 'Usuário cadastrado com sucesso' })
}