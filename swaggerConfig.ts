import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PetCare API",
      version: "1.0.0",
      description: "API para gerenciamento de pets, adotantes e endereços.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Ambiente local",
      },
    ],
    tags: [
      { name: "Pets", description: "Cadastro e consulta de pets" },
      {
        name: "Adotantes",
        description: "Cadastro e consulta de adotantes",
      },
      {
        name: "Enderecos",
        description: "Cadastro e consulta de endereços",
      },
    ],
    components: {
      schemas: {
        Pet: {
          type: "object",
          required: ["id", "nome", "especie", "idade", "adotado"],
          properties: {
            id: { type: "integer", format: "int32", example: 1 },
            nome: { type: "string", example: "Rex" },
            especie: {
              type: "string",
              enum: ["cachorro", "gato"],
              example: "cachorro",
            },
            idade: {
              type: "string",
              description: "Idade calculada em anos",
              example: "4",
            },
            adotado: { type: "boolean", example: true },
          },
        },
        CriarPet: {
          type: "object",
          required: ["nome", "dataNascimento", "adotado", "especie"],
          properties: {
            nome: { type: "string", example: "Rex" },
            dataNascimento: {
              type: "string",
              description: "Data no formato DD/MM/AAAA",
              pattern: "^\\d{2}/\\d{2}/\\d{4}$",
              example: "15/05/2020",
            },
            adotado: { type: "boolean", example: true },
            especie: {
              type: "string",
              enum: ["cachorro", "gato"],
              example: "cachorro",
            },
          },
        },
        AtualizarPet: {
          type: "object",
          properties: {
            nome: { type: "string", example: "Rex" },
            especie: {
              type: "string",
              enum: ["cachorro", "gato"],
              example: "cachorro",
            },
            idade: { type: "string", example: "5" },
            adotado: { type: "boolean", example: true },
          },
        },
        Adotante: {
          type: "object",
          required: ["id", "name", "password", "phone"],
          properties: {
            id: { type: "integer", format: "int32", example: 1 },
            name: { type: "string", example: "Maria Silva" },
            password: {
              type: "string",
              format: "password",
              example: "senha123",
            },
            phone: { type: "string", example: "11999999999" },
            photo: {
              type: "string",
              nullable: true,
              example: "https://exemplo.com/foto.jpg",
            },
            address: {
              type: "string",
              nullable: true,
              example: "Rua das Flores, 100",
            },
          },
        },
        CriarAdotante: {
          type: "object",
          required: ["name", "password", "phone"],
          properties: {
            name: { type: "string", example: "Maria Silva" },
            password: {
              type: "string",
              format: "password",
              example: "senha123",
            },
            phone: { type: "string", example: "11999999999" },
            photo: {
              type: "string",
              nullable: true,
              example: "https://exemplo.com/foto.jpg",
            },
            address: {
              type: "string",
              nullable: true,
              example: "Rua das Flores, 100",
            },
          },
        },
        AtualizarAdotante: {
          type: "object",
          properties: {
            name: { type: "string", example: "Maria Silva" },
            password: {
              type: "string",
              format: "password",
              example: "novaSenha123",
            },
            phone: { type: "string", example: "11999999999" },
            photo: {
              type: "string",
              nullable: true,
              example: "https://exemplo.com/nova-foto.jpg",
            },
            address: {
              type: "string",
              nullable: true,
              example: "Avenida Central, 200",
            },
          },
        },
        Endereco: {
          type: "object",
          required: [
            "id",
            "street",
            "city",
            "state",
            "neighborhood",
            "number",
            "zip",
          ],
          properties: {
            id: { type: "integer", format: "int32", example: 1 },
            street: { type: "string", example: "Rua das Flores" },
            city: { type: "string", example: "São Paulo" },
            state: { type: "string", example: "SP" },
            neighborhood: { type: "string", example: "Centro" },
            number: { type: "integer", example: 100 },
            zip: { type: "string", example: "01001000" },
          },
        },
        CriarEndereco: {
          type: "object",
          required: [
            "street",
            "city",
            "state",
            "neighborhood",
            "number",
            "zip",
          ],
          properties: {
            street: { type: "string", example: "Rua das Flores" },
            city: { type: "string", example: "São Paulo" },
            state: { type: "string", example: "SP" },
            neighborhood: { type: "string", example: "Centro" },
            number: { type: "integer", example: 100 },
            zip: { type: "string", example: "01001000" },
          },
        },
        AtualizarEndereco: {
          type: "object",
          properties: {
            street: { type: "string", example: "Avenida Central" },
            city: { type: "string", example: "São Paulo" },
            state: { type: "string", example: "SP" },
            neighborhood: { type: "string", example: "Centro" },
            number: { type: "integer", example: 200 },
            zip: { type: "string", example: "01001000" },
          },
        },
        Mensagem: {
          type: "object",
          properties: {
            message: { type: "string", example: "Requisição realizada com sucesso!" },
            success: { type: "boolean", example: true },
          },
        },
        ErroValidacao: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Passe um valor para o campo nome",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./build/src/routes/*.js"],
  failOnErrors: true,
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
