const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    fname: {
      type: String,
      trim: true,
    },
    lname: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
      default: "admin",
    },
    status: {
      type: String,
      trim: true,
      default: "active",
    },
    avatar: {
      type: String,
      trim: true,
      default: `${process.env.SITE_URL}/images/0default_avatar.png`,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  if (!email || !password) {
    throw new Error("You must provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email Not Found !!!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Wrong Password !!!");
  }

  return user;
};

// Hash the plain text password before save
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
