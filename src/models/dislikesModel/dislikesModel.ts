import {DataTypes, Model} from 'sequelize';
import {database} from '../../configurations/index';

export interface DislikesAttributes {
    id: string;
    postId: string;
    ownerId: string;
}

export class Dislikes extends Model<DislikesAttributes> {}

Dislikes.init(
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
    tableName: "Dislikes",
  }
);

export default Dislikes;