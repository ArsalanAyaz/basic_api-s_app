"use client"
import { useEffect, useState } from 'react';

interface AgeData {
  age: number;
}

interface GenderData {
  gender: string;
}

interface CountryData {
  country: { country_Id: string }[];
}

interface Params {
  params: { name: string };
}

const getPredictedAge = async (name: string): Promise<AgeData> => {
  const res = await fetch(`https://api.agify.io?name=${name}`);
  return res.json();
};

const getPredictedGender = async (name: string): Promise<GenderData> => {
  const res = await fetch(`https://api.genderize.io?name=${name}`);
  return res.json();
};

const getPredictedCountry = async (name: string): Promise<CountryData> => {
  const res = await fetch(`https://api.nationalize.io?name=${name}`);
  return res.json();
};

export default function Page({ params }: Params) {
  const [age, setAge] = useState<AgeData | null>(null);
  const [gender, setGender] = useState<GenderData | null>(null);
  const [country, setCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [ageData, genderData, countryData] = await Promise.all([
        getPredictedAge(params.name),
        getPredictedGender(params.name),
        getPredictedCountry(params.name)
      ]);
      setAge(ageData);
      setGender(genderData);
      setCountry(countryData);
    };

    fetchData();
  }, [params.name]);

  return (
    <div>
      <div>
        <div>personal information</div>
        <div>Age : {age?.age}</div>
        <div>Gender : {gender?.gender}</div>
        <div>Country : {country?.country[0]?.country_Id}</div>
      </div>
    </div>
  );
}
