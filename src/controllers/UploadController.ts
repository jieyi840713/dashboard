import { Request, Response } from 'express';

export class UploadController {
    public uploadFile = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({ message: '沒有檔案被上傳' });
                return;
            }
            
            const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            res.json({
                url: fileUrl,
                message: '檔案上傳成功'
            });
        } catch (error) {
            res.status(500).json({
                message: '檔案上傳失敗',
                error: error
            });
        }
    }
}