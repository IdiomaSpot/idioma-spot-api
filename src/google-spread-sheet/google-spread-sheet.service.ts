import { Inject, Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import { GSPConfig } from 'src/config/configuration';

@Injectable()
export class GoogleSpreadSheetService {

    private auth: any;
    private client: any;
    private sheets: sheets_v4.Sheets;

    constructor(@Inject('CONFIG_OPTIONS') private options: GSPConfig) {
        options && this.authorize(options);
    }

    private async authorize(options: GSPConfig) {
        this.auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: options.config.client_email,
                private_key: options.config.private_key,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        try {
            this.client = await this.auth.getClient();
            this.sheets = google.sheets({ version: 'v4', auth: this.auth });
            console.log('GSS Connection Completed');
        } catch (e: any) {
            console.log('Connection ERROR', e);
        }
    }

    async getValuesFromSpreadSheet(spreadSheetConfig: ISpreadSheetReq) {
        try {
            const data = await this.sheets.spreadsheets.values.get({
                auth: this.auth,
                spreadsheetId: spreadSheetConfig.id,
                range: spreadSheetConfig.range,
            });
            return data;
        } catch (e) {
            console.log("ERROR", e);
            return Promise.reject({ message: 'We are having troubles reading the target file', reason: e });
        }
    }
}

export interface ISpreadSheetReq {
    id: string;
    range: string;
}
