var express = require('express');
var router = express.Router();

router.get('/ping', (req, res)=>{
    res.json({response: "pong", details: {project_name: "demo_node", version: "0.0.1", tag: "demo", description: "node demo project ..." } });
});

// if no url matched
router.get('/*', (req, res) => {
    return res.json({status: false, message: "wrong url..."});
});


module.exports = router;