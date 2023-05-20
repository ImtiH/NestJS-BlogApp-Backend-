import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './auth/jwt.strategy';
import { BlogController } from './blog/blog.controller';
import { Blog, BlogSchema } from './blog/blog.schema';
import { BlogService } from './blog/blog.service';
import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: User.name, schema: UserSchema },
    ]),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [BlogController, UserController],
  providers: [BlogService, UserService, JwtStrategy],
})
export class AppModule {}
