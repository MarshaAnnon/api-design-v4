import prisma from "../db";

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []) // <<<<------ if you have to do something like this then it's a tell tale sign that you need to normalize your data or revisit your schema. You typically want to avoid putting things in memory if you can avoid it and find a way for your database to do the work for you.
    res.json({ data: updates})
}

export const getUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })  
    return res.json({ data: update })
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {    
            id: req.body.productId
        },
    })
    if (!product) {
        return res.status(404).json({ error: 'product not found'})
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    })
    return res.json({ data: update})
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {  
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])
    
    const match = updates.find(update => update.id === req.params.id)
    
    if (!match) {
        res.status(404).json({ error: 'update not possible'})
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    res.json({ data: updatedUpdate})
}

export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {  
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])
    
    const match = updates.find(update => update.id === req.params.id)
    
    if (!match) {
        res.status(404).json({ error: 'update not possible'})
    } else {
       return res.json({ data: match})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({ data: deleted})
}
