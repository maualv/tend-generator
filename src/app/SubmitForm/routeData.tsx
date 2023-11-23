const routeData = (formData) => {
    const formDataValues = formData.map(item => {
      return {
        path: item.path,
        body: item.body,
        requestType: item.requestType
      };
    });
  
    let router = `const express = require('express')\nconst Model = require('../models/models')\nconst router = express.Router()`;
  
    formDataValues.forEach(data => {
      const match = data.body.match(/"([^"]+)":/);
      const keyExtraida = match ? match[1] : null;
      console.log(keyExtraida);
      switch (data.requestType) {
        case 'POST':
          router += `router.post('${data.path}', async (req, res) => {\n  try {\n    const data = new Model({\n      ${keyExtraida}: req.body.${keyExtraida}\n    });\n    const dataToSave = await data.save(); // Mongoose method\n    res.status(201).json(dataToSave);\n  } catch (error) {\n    res.status(400).json({ message: error.message });\n  }\n});\n`;
          break;
        case 'GET':
          router += `router.get('${data.path}', async (req, res) => {\n  try {\n    const data = await Model.find(); // Mongoose method\n    res.json(data);\n  } catch (error) {\n    res.status(500).json({ message: error.message });\n  }\n});\n`;
          break;
        case 'PUT':
          router += `router.put('${data.path}', async (req, res) => {\n  try {\n    // Lógica para actualizar el recurso con ID value\n    res.status(200).json({ message: 'Actualización exitosa' });\n  } catch (error) {\n    res.status(500).json({ message: error.message });\n  }\n});\n`;
          break;
        case 'DELETE':
          router += `router.delete('${data.path}', async (req, res) => {\n  try {\n    // Lógica para eliminar el recurso con ID value\n    res.status(200).json({ message: 'Eliminación exitosa' });\n  } catch (error) {\n    res.status(500).json({ message: error.message });\n  }\n});\n`;
          break;
        default:
          break;
      }
    });
  
    router += `module.exports = router`;
    return router;
  };
  
  export default routeData;
  