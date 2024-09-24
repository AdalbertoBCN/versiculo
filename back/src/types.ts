export interface Biblia {
    antigoTestamento: Book[];
    novoTestamento: Book[];
}

export interface Book {
    nome: string;
    capitulos: Chapter[];
}

export interface Chapter {
    capitulo: number;
    versiculos: Verse[];
}

export interface GetRandomChapterResponse {
    bookName: string
    bookNumber: number
    chapterNumber: number
    verses: {
        verseNumber: number
        text: string
        }[]
}

export interface Verse {
    versiculo: number;
    texto: string;
}

export type Testament = "OLD_TESTAMENT" | "NEW_TESTAMENT";

  


//   interface AntigoTestamento {
//     "Gênesis": Livro;
//     "Êxodo": Livro;
//     "Levítico": Livro;
//     "Números": Livro;
//     "Deuteronômio": Livro;
//     "Josué": Livro;
//     "Juízes": Livro;
//     "Rute": Livro;
//     "I Samuel": Livro;
//     "II Samuel": Livro;
//     "I Reis": Livro;
//     "II Reis": Livro;
//     "I Crônicas": Livro;
//     "II Crônicas": Livro;
//     "Esdras": Livro;
//     "Neemias": Livro;
//     "Tobias": Livro;
//     "Judite": Livro;
//     "Ester": Livro;
//     "Jó": Livro;
//     "Salmos": Livro;
//     "Provérbios": Livro;
//     "Eclesiastes": Livro;
//     "Cântico dos Cânticos": Livro;
//     "Sabedoria": Livro;
//     "Eclesiástico": Livro;
//     "Isaías": Livro;
//     "Jeremias": Livro;
//     "Lamentações": Livro;
//     "Baruc": Livro;
//     "Ezequiel": Livro;
//     "Daniel": Livro;
//     "Oséias": Livro;
//     "Joel": Livro;
//     "Amós": Livro;
//     "Abdias": Livro;
//     "Jonas": Livro;
//     "Miquéias": Livro;
//     "Naum": Livro;
//     "Habacuc": Livro;
//     "Sofonias": Livro;
//     "Ageu": Livro;
//     "Zacarias": Livro;
//     "Malaquias": Livro;
// }

// interface NovoTestamento {
//     "São Mateus": Livro;
//     "São Marcos": Livro;
//     "São Lucas": Livro;
//     "São João": Livro;
//     "Atos dos Apóstolos": Livro;
//     "Romanos": Livro;
//     "I Coríntios": Livro;
//     "II Coríntios": Livro;
//     "Gálatas": Livro;
//     "Efésios": Livro;
//     "Filipenses": Livro;
//     "Colossenses": Livro;
//     "I Tessalonicenses": Livro;
//     "II Tessalonicenses": Livro;
//     "I Timóteo": Livro;
//     "II Timóteo": Livro;
//     "Tito": Livro;
//     "Filemon": Livro;
//     "Hebreus": Livro;
//     "São Tiago": Livro;
//     "I São Pedro": Livro;
//     "II São Pedro": Livro;
//     "I São João": Livro;
//     "II São João": Livro;
//     "III São João": Livro;
//     "São Judas": Livro;
//     "Apocalipse": Livro;
// }