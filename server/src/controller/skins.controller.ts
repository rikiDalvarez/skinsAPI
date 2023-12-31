import { Request, Response, NextFunction } from "express";
import database from "../../config/mysql.config";
import QUERY_SKINS from "../query/skins.query";
import { skinService } from "../dependencies";

export const getSkin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const numberId: number = Number(id);

  if (isNaN(numberId) || numberId < 0) {
    return next(new Error("invalid_Id"));
  }

  try {
    const skin = await skinService.getSkinById(numberId);
    if (!skin) {
      return next(new Error("skin_not_found"));
    }
    res.status(200).send({ skin });
  } catch (error) {
    return next(error);
  }
};

export const getAvailableSkins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skins = await skinService.getAvailableSkin();
    if (!skins) {
      return next(new Error("skin_not_found"));
    }
    res.status(200).send({ skins });
  } catch (error) {
    return next(error);
  }
};

export const getSkins = async (req: Request, res: Response) => {
  database.query(QUERY_SKINS.SELECT_SKINS, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).send({ skins: results });
    }
  });
};

export const createSkin = async (req: Request, res: Response) => {
  const { name, price, color, type, quantity } = req.body;
  database.query(
    QUERY_SKINS.CREATE_SKIN,
    [name, price, type, color, quantity],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(201).json({ skin: results });
      }
    }
  );
};
