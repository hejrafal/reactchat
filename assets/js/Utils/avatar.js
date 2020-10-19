
const avatarUrlGenerator = (user, size = 40) => {
    return `https://robohash.org/${user.id}?size=${size}x${size}`;
}

export default avatarUrlGenerator;
