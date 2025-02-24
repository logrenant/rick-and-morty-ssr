"use client";

import Image from "next/image";

import { useCharacters } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CharacterList = () => {
  const { data, error, isLoading } = useCharacters();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 tracking-tight lg:px-8">
      {data?.results.map((character) => (
        <Card key={character.id}>
          <CardHeader>
            <CardTitle className="py-4">{character.name}</CardTitle>
            <CardDescription>
              <p>Status: {character.status}</p>
            </CardDescription>
            <CardDescription>
              <Image
                src={character.image}
                alt={character.name}
                className="rounded-lg w-full"
                width={200}
                height={200}
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Gender: {character.gender}</p>
          </CardContent>
          <CardContent>
            <p>Origins: {character.origin.name}</p>
          </CardContent>
          <CardContent>
            <p>Species: {character.species}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
