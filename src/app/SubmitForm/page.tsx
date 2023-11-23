"use client"
// components/SubmitForm.js
import { useState } from 'react';

import routeData from './routeData';
import modelData from './modelData';

import xml2js from 'xml2js';
import JSZip from 'jszip';


const SubmitForm = ({ initialData }) => {
    const [formData, setFormData] = useState(initialData);

    const handleInputChange = (index, field, value) => {
        const newData = [...formData];
        newData[index][field] = value;
        setFormData(newData);
    };


    const handleDeleteLastEndpoint = () => {
        if (formData.length > 0) {
            const newData = [...formData];
            newData.pop();
            setFormData(newData);
        }
    };

    const handleAddEndpoint = () => {
        setFormData([...formData, { path: '', body: '', requestType: '' }]);
    };

    const handleModelData = () => {
        const result = modelData(formData);
        console.log(result);
    };


    const downloadXml = () => {
        const builder = new xml2js.Builder();
        const xmlContent = builder.buildObject({ data: formData });
        const blob = new Blob([xmlContent], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'submitted_data.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadJson = () => {
        const jsonContent = JSON.stringify(formData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'submitted_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadZip = () => {
        const jsonContent = JSON.stringify(formData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const resultModel = modelData(formData);
        const resultRouter = routeData(formData);
        

        const zip = new JSZip();
        const modelFolder = zip.folder('model');
        const routerFolder = zip.folder('router');

        modelFolder.file('model.js', resultModel);
        routerFolder.file('router.js', resultRouter);

        zip.file('submitted_data.json', blob);

        zip.generateAsync({ type: 'blob' }).then(content => {
        // Crea un objeto Blob con el contenido del ZIP
        const zipBlob = new Blob([content]);

        // Crea un enlace para descargar el ZIP
        const a = document.createElement('a');
        a.href = URL.createObjectURL(zipBlob);
        a.download = 'apiCode.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Generador de código con js y mongoose</h2>

            <form>
                {formData.map((obj, index) => (
                    <div key={index} className="mb-4">
                        <h1 className="font-bold">Endpoint: {index+1}</h1>
                        <input
                            type="text"
                            name={`path_${index}`}
                            placeholder="Path"
                            className="border rounded w-full p-2"
                            value={obj.path}
                            onChange={(e) => handleInputChange(index, 'path', e.target.value)}
                        />

                        <textarea
                            name={`body_${index}`}
                            placeholder="Body"
                            className="border rounded w-full p-2 mt-2"
                            value={obj.body}
                            onChange={(e) => handleInputChange(index, 'body', e.target.value)}
                        />

                        <input
                            type="text"
                            name={`requestType_${index}`}
                            placeholder="Request Type"
                            className="border rounded w-full p-2 mt-2"
                            value={obj.requestType}
                            onChange={(e) => handleInputChange(index, 'requestType', e.target.value)}
                        />
                    </div>
                ))}

                <button type="button" onClick={handleAddEndpoint} className="bg-indigo-500 text-white px-4 py-2 rounded mt-4">
                    Add New Endpoint
                </button>

                <button
                    type="button"
                    onClick={handleDeleteLastEndpoint}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
                >
                    Delete Last Endpoint
                </button>

                <button type="button" onClick={downloadJson} className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-2">
                    Download JSON
                </button>

                <button type="button" onClick={downloadXml} className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 ml-2">
                    Download XML
                </button>
                <button type="button" onClick={downloadZip} className="bg-violet-500 text-white px-4 py-2 rounded mt-4 ml-2">
                    Download API Code
                </button>
            </form>
        </div>
    );
};

export default SubmitForm;
