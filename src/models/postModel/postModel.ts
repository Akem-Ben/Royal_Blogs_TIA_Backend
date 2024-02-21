import {DataTypes, Model} from 'sequelize';
import {database} from '../../configurations/index';

export interface BlogPostAttributes {
    id: string;
    ownerId: string;
    postText: string;
    likes: number;
    dislikes: number;
}

export class BlogPost extends Model<BlogPostAttributes> {}

BlogPost.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    ownerId:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: database,
    tableName: "BlogPost",
  }
);

export default BlogPost;