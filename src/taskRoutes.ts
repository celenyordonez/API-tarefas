import { Router } from "express";
import prisma from "./prismaClient";

const router = Router();

//Criar Tarefa
router.post("/tasks", async (req, res) => {
    try{
        const {title , description} =req.body

        const task = await prisma.task.create({
            data:{
                title,
                description
            }
        })
        return res.status(201).json(task)
    }catch(error){
        return res.status(500).json({error:"Erro ao criar tarefa"})
    }
})
//Listar todas as tarefas
router.get("/tasks" , async (req, res) => {
    try{
        const task = await prisma.task.findMany();

        return res.status(201).json(task)
    }catch{
           return res.status(500).json({error: "ERro ao buscar tarefa"})
    }
});
//Listar por id
router.get("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
 
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
 
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
 
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
});
 //Atualizar por id (Atualizar uma tarefa existente)
router.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;
 
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        completed,
      },
    });
 
    return res.status(201).json(task);
  } catch (error) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }
});
 //Deletar por id (Remover uma tarefa)
router.delete("/tasks/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
 
        await prisma.task.delete({
            where: {
                id: id
            }
        })
 
        return res.status(201).json("Tarefa deletada com sucesso")
    } catch(error) {
        return res.status(404).json({error: "Tarefa não encontrada"})
    }
})
 
export default router;
 
 