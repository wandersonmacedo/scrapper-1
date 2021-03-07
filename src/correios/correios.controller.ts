import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CorreiosService } from './correios.service';

interface Rastreio {
    id: string;
    name: string;
}

@Controller('correios')
export class CorreiosController {
    constructor(private correiosService: CorreiosService) {}

    @Post()
    createProduct(@Body() correio: Rastreio) {
        return this.correiosService.findPackageCorreio(correio);
    }

}