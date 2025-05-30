import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { User } from './modules/user/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function createDefaultAdmin(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);
  const existing = await repo.findOne({ where: { username: 'admin' } });
  if (!existing) {
    const user = new User();
    user.username = 'admin';
    user.password = await bcrypt.hash('admin', 10);
    user.isAdmin = true;
    await repo.save(user);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const dataSource = app.get(DataSource);
  await createDefaultAdmin(dataSource);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
