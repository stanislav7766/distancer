export const mapForDBProfile = ({age, height, weight, ...profile}) => ({
  ...profile,
  age: +age,
  weight: +weight,
  height: +height,
});

export const mapForStoreProfile = ({age, height, weight, ...profile}) => ({
  ...profile,
  age: `${age}`,
  weight: `${weight}`,
  height: `${height}`,
});
