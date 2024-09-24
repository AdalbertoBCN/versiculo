import path from 'path';
import fs from 'fs';
import { Biblia } from '../types';
import { prisma } from "../../prisma/prisma";

const filePath = path.resolve('./src/db/bible.json');
const bible: Biblia = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

async function seed() {

  // Deletando todas as tabelas em cascata
  await prisma.verse.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.book.deleteMany();

  // Inserir os livros do Antigo Testamento sequencialmente
  for (let index = 0; index < bible.antigoTestamento.length; index++) {
    const book = bible.antigoTestamento[index];
    
    await prisma.book.create({
      data: {
        number: index + 1,
        name: book.nome,
        testament: "OLD_TESTAMENT",
      }
    });
    console.log(`Old Testament book "${book.nome}" created`);
  }

  // Inserir os livros do Novo Testamento sequencialmente
  for (let index = 0; index < bible.novoTestamento.length; index++) {
    const book = bible.novoTestamento[index];
    
    await prisma.book.create({
      data: {
        number: index + 47,
        name: book.nome,
        isGospel: [47, 48, 49, 50].includes(index + 47),
        testament: "NEW_TESTAMENT",
      }
    });
    console.log(`New Testament book "${book.nome}" created`);
  }

  // Inserir capítulos e versículos do Antigo Testamento
  for (let bookIndex = 0; bookIndex < bible.antigoTestamento.length; bookIndex++) {
    const book = bible.antigoTestamento[bookIndex];
    
    for (let chapterIndex = 0; chapterIndex < book.capitulos.length; chapterIndex++) {
      const chapter = book.capitulos[chapterIndex];

      await prisma.chapter.create({
        data: {
          number: chapterIndex + 1,
          bookNumber: bookIndex + 1,
          verses: {
            createMany: {
              data: chapter.versiculos.map(verse => ({
                number: verse.versiculo,
                text: verse.texto
              }))
            }
          }
        }
      });
      console.log(`Chapter ${chapter.capitulo} of ${book.nome} created`);
    }
  }

  // Inserir capítulos e versículos do Novo Testamento
  for (let bookIndex = 0; bookIndex < bible.novoTestamento.length; bookIndex++) {
    const book = bible.novoTestamento[bookIndex];
    
    for (let chapterIndex = 0; chapterIndex < book.capitulos.length; chapterIndex++) {
      const chapter = book.capitulos[chapterIndex];

      await prisma.chapter.create({
        data: {
          number: chapterIndex + 1,
          bookNumber: bookIndex + 47,
          verses: {
            createMany: {
              data: chapter.versiculos.map(verse => ({
                number: verse.versiculo,
                text: verse.texto
              }))
            }
          }
        }
      });
      console.log(`Chapter ${chapter.capitulo} of ${book.nome} created`);
    }
  }

}

seed()
  .finally(async () => {
    await prisma.$disconnect();
  });
