import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv'
export function auditoriaV(req, res, next){
        console.log("Registro en auditoria");
        const auditoriaPath = path.resolve(process.env.JSON_DIRECTORY, 'auditoriaV.json');
        const objAuditoria = JSON.parse(fs.readFileSync(auditoriaPath, 'utf-8'));
      
        
                  objAuditoria.countViews++;
            fs.writeFileSync(auditoriaPath, JSON.stringify(objAuditoria,null,' '));

        next();
};
 

    