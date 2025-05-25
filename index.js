const fastify = require('fastify')({logger: true})
fastify.register(require("@fastify/cors"),{})

function myMiddleware(request,reply,next){
    console.log('middleware run')
    next();
}

fastify.addHook('preHandler', myMiddleware)

fastify.get('/',async (request,reply) => {
    reply.send({
        message : "server is listening"
    })
})

fastify.get('/health',async (request,reply) => {
    reply.send({
        message : "server is healthy"
    })
})

fastify.get('/user/:id',(request,reply) => {
    const id = request.params.id;
    reply.send({
        id : id
    })
})


fastify.post('/data', async(request,reply) => {
    const {name,age} =  request.body;
    return { name, age }
    
})

fastify.post('/tweet', async(request,reply) => {
    const {title,desc} =  request.body;
    return { title,desc }
    
})

fastify.get('/tweet/:id',(request,reply) => {
    const id = request.params.id;
    reply.send({
        id : id,
        message : "tweet recieved"
    })
})

fastify.get('/tweet', async(request,reply) => {
   const tweet = "Elon musk latest tweet goes here!"
    return { tweet }

})

fastify.post('/validate', {
    schema : {
        body : {
            type : "object",
            required : ["name","age"],
            properties : {
                name : {type : "string"},
                age : {type : "integer"},
            },
        },
    },
},
    async (request, reply) => {
        reply.send({
            message : "validated successfully"
        })
    }
)

fastify.post('/validate', {
    schema : {
        body : {
            type : "object",
            required : ["title","desc"],
            properties : {
                title : {type : "string"},
                desc : {type : "string"},
            },
        },
    },
},
    async (request,reply) => {
        reply.send({
            message : "posted successfully"
        })
    }
)

fastify.listen({port : 4000}, (address)=>{
    console.log("listening on port 4000")
})