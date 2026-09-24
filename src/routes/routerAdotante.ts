import express from "express";
import ControllerAdotante from "../controller/controllerAdotante";
import AdotanteRepository from "../repositories/adotanteRepository";
import { AppDataSource } from "../config/dbConfig";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new ControllerAdotante(adotanteRepository);

/**
 * @openapi
 * /adotante:
 *   get:
 *     tags: [Adotantes]
 *     summary: Lista todos os adotantes
 *     responses:
 *       200:
 *         description: Lista de adotantes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Adotante'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Falha interna ao listar os adotantes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *   post:
 *     tags: [Adotantes]
 *     summary: Cadastra um adotante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarAdotante'
 *     responses:
 *       200:
 *         description: Adotante cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Adotante'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Campo obrigatório não informado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroValidacao'
 *       500:
 *         description: Falha interna ao cadastrar o adotante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 */
router.get("/adotante", adotanteController.listarAdotante);

/**
 * @openapi
 * /adotante/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: Identificador numérico do adotante
 *       schema:
 *         type: integer
 *         format: int32
 *   get:
 *     tags: [Adotantes]
 *     summary: Busca um adotante pelo ID
 *     responses:
 *       200:
 *         description: Adotante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Adotante'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Adotante não encontrado ou falha interna
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *   put:
 *     tags: [Adotantes]
 *     summary: Atualiza um adotante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarAdotante'
 *     responses:
 *       200:
 *         description: Adotante atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Adotante'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       404:
 *         description: Adotante não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *   delete:
 *     tags: [Adotantes]
 *     summary: Exclui um adotante
 *     responses:
 *       200:
 *         description: Adotante excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       404:
 *         description: Adotante não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 */
router.get("/adotante/:id", adotanteController.adotantePorId);
router.post("/adotante", adotanteController.criarAdotante);
router.put("/adotante/:id", adotanteController.atualizarAdotante);
router.delete("/adotante/:id", adotanteController.deletarAdotante);

export default router
