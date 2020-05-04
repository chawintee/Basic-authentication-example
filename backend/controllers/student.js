const db = require('../models');


const getAllStudent = async (req,res) => {
    const students = await db.Student.findAll();

    res.send(students)
};

const getStudentById = async (req,res) => {
    const studentsId = Number(req.params.id);
    const targetStudent = await db.Student.findOne(
        {where:{id:studentsId}}
    );

    if(targetStudent){
        res.send(targetStudent);
    }else{
        res.send({targetId : "is not found"})
    }
};

const createNewStudent = async (req,res) => {
    
    const name = req.body.name;
    const age = Number(req.body.age);
    const numberPhone = req.body.numberPhone;

    const newStudent = await db.Student.create({
        name,
        age,
        number_phone:numberPhone
    })

    res.status(201).send(newStudent)
    
};

const editStudentById = async (req,res) => {
    const studentId = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const numberPhone = req.body.numberPhone;

    await db.Student.update({
        name,
        age,
        number_phone: numberPhone,
    },
        {
            where : {id : studentId}
        }
    )

    res
    .status(200)
    .send({ message: `student id : ${studentId} has been updated.` });

};

const deleteStudentById = async (req,res) => {
    const studentId = req.params.id;

    await db.Student.destroy({where: {id: studentId}});

    res.status(204).send();
};

module.exports = {
    getAllStudent,
    getStudentById,
    createNewStudent,
    editStudentById,
    deleteStudentById
}