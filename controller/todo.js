const Todo= require('../models/todo')

/**
 * Fetching all the tasks and taking count of completed and due tasks
 */
module.exports.fetchAllTasks =async (req,res)=>{
    let tasks = (await Todo.find({}))
    let todayDue=0
    let completedTask=0
    let allDue=0
    tasks.forEach(element => {
        var dueCustomDate = element.dueDate
        /** If due date is available, comparing with current date and checking if it is today's due */
        if(dueCustomDate.length!=0){
            var arr = dueCustomDate.split('/')
            var dateF=new Date().getDate() 
            dateF=dateF<10?`0${dateF}`:dateF
            var monthF=(new Date().getMonth()+1)
            monthF=monthF<10?`0${monthF}`:monthF
            if(parseInt(arr[0])==parseInt(dateF) && parseInt(arr[1])==parseInt(monthF)){
                todayDue++
            }
        }
        /** Checking completion status for completed count */
        if(element.completed==true){
            completedTask++
        }else{
            allDue++
        }   
    });
    /**Render the todo template with tasks, tasks due today, completed tasks and all due tasks */
    res.render('todo',{tasks:tasks, todayDue, completedTask,allDue:allDue})
}

/**
 * Controller to create a new task from the data received as request body
 * @param {*} req 
 * @param {*} res 
 */
module.exports.createTask=async(req,res)=>{
    let dateFormat;
    /* Formatting the date */
    if(req.body.dueDate.length!=0){
        const arr = req.body.dueDate.split('-')
        dateFormat= arr[2]+"/"+arr[1]+"/"+arr[0]
    }else{
        dateFormat=""
    }
    /* Extracting the data from request */
    Todo.create({
        id: (new Date().getMilliseconds()),
        description:req.body.description,
        category:req.body.category,
        dueDate:dateFormat,
        completed:false    
    },function(err,newTodo){
        if(err){
            console.log('Error in creating todo')
            return
        }
        return res.redirect('back')
    })
}
/**
 * Controller to modify the given id task comletion status
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports.markComplete=async(req,res)=>{
        try{ const doc = await Todo.findOneAndUpdate({id:req.body.id},{completed:true},{
            new: true
          })
        console.log(doc)
        await doc.save()
    }
        catch(err){
            console.log(err)
        }
        return res.redirect('/todo')
    }

/**
 * Controller for deleteing task provided by id
 */
module.exports.deleteTask=async(req,res)=>{
    Todo.findOneAndDelete(({id:req.body.id}),function(err,task){
        if (err){
            console.log(err)
            return
        }
            return res.redirect('/todo')
    }) 
}

