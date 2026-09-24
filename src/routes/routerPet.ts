import express from "express";

import ControllerPet from "../controller/controllerPet";
import PetRepository from "../repositories/petRepositories";
import { AppDataSource } from "../config/dbConfig";

const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity")
);
const petController = new ControllerPet(petRepository);

/**
 * @openapi
 * /pets:
 *   get:
 *     tags: [Pets]
 *     summary: Lista todos os pets
 *     responses:
 *       200:
 *         description: Lista de pets retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Falha interna ao listar os pets
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *   post:
 *     tags: [Pets]
 *     summary: Cadastra um pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarPet'
 *     responses:
 *       201:
 *         description: Pet cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pet'
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Campo obrigatório não informado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroValidacao'
 *       500:
 *         description: Falha interna ao cadastrar o pet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 */
router.get("/pets", petController.listarPet);

/**
 * @openapi
 * /pets/query:
 *   get:
 *     tags: [Pets]
 *     summary: Filtra os pets pelo estado de adoção
 *     parameters:
 *       - in: query
 *         name: adotado
 *         required: false
 *         description: Quando omitido, o valor considerado é false
 *         schema:
 *           type: boolean
 *           default: false
 *     responses:
 *       200:
 *         description: Consulta realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Não foi possível aplicar o filtro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 */
router.get("/pets/query", petController.queryParams);

/**
 * @openapi
 * /pets/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: Identificador numérico do pet
 *       schema:
 *         type: integer
 *         format: int32
 *   get:
 *     tags: [Pets]
 *     summary: Busca um pet pelo ID
 *     responses:
 *       200:
 *         description: Pet encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Pet'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Pet não encontrado ou falha interna
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *   put:
 *     tags: [Pets]
 *     summary: Atualiza um pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarPet'
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       404:
 *         description: Pet não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *   delete:
 *     tags: [Pets]
 *     summary: Exclui um pet
 *     responses:
 *       200:
 *         description: Pet excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       404:
 *         description: Pet não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 */
router.get("/pets/:id", petController.petPorId);
router.post("/pets", petController.criarPet);
router.put("/pets/:id", petController.atualizaPet);
router.delete("/pets/:id", petController.deletePet);

export default router;
