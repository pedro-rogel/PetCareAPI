import express from "express";
import ControllerEndereco from "../controller/controllerEndereco";
import EnderecoRepository from "../repositories/enderecoRepository";
import { AppDataSource } from "../config/dbConfig";

const router = express.Router();
const enderecoRepository = new EnderecoRepository(
  AppDataSource.getRepository("EnderecoEntity")
);
const adotanteController = new ControllerEndereco(enderecoRepository);

/**
 * @openapi
 * /endereco:
 *   get:
 *     tags: [Enderecos]
 *     summary: Lista todos os endereços
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listadeEnderecos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Endereco'
 *                 message:
 *                   type: string
 *       500:
 *         description: Falha interna ao listar os endereços
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *   post:
 *     tags: [Enderecos]
 *     summary: Cadastra um endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CriarEndereco'
 *     responses:
 *       200:
 *         description: Endereço cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Endereco'
 *                 resnponse:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                     success:
 *                       type: boolean
 *       400:
 *         description: Campo obrigatório não informado ou falha no cadastro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroValidacao'
 */
router.get("/endereco", adotanteController.listarEndereco);

/**
 * @openapi
 * /endereco/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: Identificador numérico do endereço
 *       schema:
 *         type: integer
 *         format: int32
 *   put:
 *     tags: [Enderecos]
 *     summary: Atualiza um endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarEndereco'
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Endereco'
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       400:
 *         description: Endereço não encontrado ou falha na atualização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *   delete:
 *     tags: [Enderecos]
 *     summary: Exclui um endereço
 *     responses:
 *       200:
 *         description: Endereço excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       400:
 *         description: Endereço não encontrado ou falha na exclusão
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 */
router.post("/endereco", adotanteController.criarEndereco);
router.put("/endereco/:id", adotanteController.atualizarEndereco);
router.delete("/endereco/:id", adotanteController.deletarEndereco);

export default router;
