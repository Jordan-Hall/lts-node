import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { Connection } from 'mongoose';
import * as GridFsStorage from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
	gridFsStorage: GridFsStorage;
	constructor(@InjectConnection() private readonly connection: Connection) {
		this.gridFsStorage = new GridFsStorage({
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			},
			url: 'mongodb://localhost:27017/file-upload?retryWrites=true&w=majority',
			file: (req, file) => {
				return new Promise((resolve, reject) => {
					const filename = file.originalname.trim();
					const fileInfo = {
						filename: filename,
					};
					resolve(fileInfo);
				});
			}
		});
	}

	createMulterOptions(): MulterModuleOptions {
		return {
			storage: this.gridFsStorage,
		};
	}
}