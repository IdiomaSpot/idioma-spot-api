import { DynamicModule, Module } from '@nestjs/common';
import { GoogleSpreadSheetService } from './google-spread-sheet.service';
import { GSPConfig } from 'src/config/configuration';


@Module({})
export class GoogleSpreadSheetModule {
    static register(options: GSPConfig): DynamicModule {
        return {
            module: GoogleSpreadSheetModule,
            providers: [
                {
                    provide: 'CONFIG_OPTIONS',
                    useValue: options,
                },
                GoogleSpreadSheetService,
            ],
            exports: [GoogleSpreadSheetService],
        };
    }
}
