const mockhash = "$2b$10$td2JhOjeQGIseROUNQSse.o1h/0f3ld9AJN6PLN6yTOoTNfGuAL/."

const user1 = { email:"ced@test.fr", password:mockhash}
const user2 = { email:"test@test.fr", password:mockhash}
const user3 = { email:"test2@test.fr", password:mockhash}
const users = [user1, user2, user3]

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {users, prisma}