// const {Pet}=require('../models/user.model');

// module.exports.createPet=(request,response)=>{
//     const {Name,Type,Description,Skill1,Skill2,Skill3}=request.body;
//     Pet.create({
//         Name,Type,Description,Skill1,Skill2,Skill3
//     })
//     .then(pet=>response.json(pet))
//     .catch(err=>response.status(400).json(err))
// }

// module.exports.getAll=(request,response)=>{
//     Pet.find({}).sort({Name: 1}).exec()
//     .then(pets=>response.json(pets))
//     .catch(err=>response.json(err))
// }

// module.exports.getPet = (request, response) => {
//     Pet.findOne({_id:request.params.id})
//         .then(pet => response.json(pet))
//         .catch(err => response.status(400).json(err))
// }

// module.exports.updatePet = (request, response) => {
//     Pet.findOneAndUpdate({_id: request.params.id}, request.body, {runValidators:true,new:true})
//         .then(updatedPet => response.json(updatedPet))
//         .catch(err => response.status(400).json(err))
// }

// module.exports.deletePet= (request, response) => {
//     Pet.deleteOne({ _id: request.params.id })
//         .then(deleteConfirmation => response.json(deleteConfirmation))
//         .catch(err => response.json(err))
// }