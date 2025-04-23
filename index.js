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
    async (request,reply) => {
        reply.send({
            message : "validated successfully"
        })
    }
)

fastify.listen({port : 4000}, (address)=>{
    console.log("server is listening on port 4000")
})