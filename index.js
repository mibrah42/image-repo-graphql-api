import { GraphQLServer } from "graphql-yoga";
import { db } from "./firebase/config";

// Type definitions (Schema)
const typeDefs = `
    type Query {
        images: [Image]!
        search(query: String!): [Image]!
        delete(id: ID!): Boolean
    }

    type Image {
        id: ID!
        title: String!
        description: String
        tags: String
        url: String
    }
`;

// Resolvers
const resolvers = {
  Query: {
    images: async () => {
      const response = await db.collection("images").get();
      const images = [];
      response.forEach(doc => {
        const data = doc.data();
        images.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          tags: data.tags,
          url: data.url
        });
      });
      return images;
    },

    search: async (parent, { query }, ctx, info) => {
      const response = await db.collection("images").get();
      const images = [];
      response.forEach(doc => {
        const data = doc.data();
        if (query !== "") {
          if (
            data.title.toLowerCase().includes(query) ||
            data.description.toLowerCase().includes(query) ||
            data.tags.toLowerCase().includes(query)
          ) {
            images.push({
              id: doc.id,
              title: data.title,
              description: data.description,
              tags: data.tags,
              url: data.url
            });
          }
        } else {
          images.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            tags: data.tags,
            url: data.url
          });
        }
      });
      return images;
    },
    delete: async (parent, { id }, ctx, info) => {
      try {
        await db
          .collection("images")
          .doc(id)
          .delete();
        return true;
      } catch (error) {
        console.log("Error deleting image", error);
        return false;
      }
    }
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start({ port: process.env.PORT || 4000 });
