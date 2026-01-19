import { prisma } from '../src/lib/client'

async function main() {
  await prisma.sector.createMany({
    data: [
      { name: 'Suporte' },
      { name: 'TI' },
      { name: 'Secretaria'}
    ],
    skipDuplicates: true,
  })

   await prisma.user.createMany({
    data: [
      { name: 'user1',
        role: 'programador',
        sectorId: 2
      },
      { name: 'user2',
        role: 'administrador',
        sectorId: 3
      },
      { name: 'user3',
        role: 'técnico',
        sectorId: 1
      }
    ],
    skipDuplicates: true,
  })


  console.log('Seed finalizado!')
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())