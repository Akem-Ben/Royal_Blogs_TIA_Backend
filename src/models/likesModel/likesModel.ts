import {DataTypes, Model} from 'sequelize';
import {database} from '../../configurations/index';

export interface LikesAttributes {
    id: string;
    postId: string;
    ownerId: string;
}

export class Likes extends Model<LikesAttributes> {}

Likes.init(
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
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
},
  {
    sequelize: database,
    tableName: "Likes",
  }
);

export default Likes;