export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) {
    return "Unknown";
  }

  const sender = users.find((user) => user._id === loggedUser._id);

  if (sender) {
    const otherUser = users.find((user) => user._id !== loggedUser._id);
    return otherUser ? otherUser.name : "Unknown";
  } else {
    return "Unknown";
  }
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0].name;
};
