import {DataTypes, Model} from 'sequelize';
import {database} from '../../configurations/index';

export interface CommentAttributes {
    commentId: string;
    postId: string;
    userName: string;
    commentText: string;
    likes: number;
    dislikes: number;
    ownerId: string;
  }
  
  export class Comment extends Model<CommentAttributes> {}
  
  Comment.init(
    {
      commentId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ownerId:{
        type: DataTypes.UUID,
        allowNull: false,
    },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentText: {
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
      tableName: "Comment",
    }
  );