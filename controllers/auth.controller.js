import { User, Role } from "../models/index.js";
import bcrypt from "bcrypt";
import { saltRounds } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result == true) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      const roleForForm = await Role.findById(user.role)
      res.status(200).send({ token: token, formId: roleForForm.form });
    } else {
      res.status(400).send("Err");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const newUser = async (req, res) => {
  try {
    const role = await Role.findOne({ roleName: req.body.role });
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    const data = new User({
      email: req.body.email,
      password: hash,
      role: role._id,
    });
    await role.updateOne({ people: [...role.people, data._id] });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
