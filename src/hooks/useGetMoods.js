import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const useGetMoods = () => {
  const { user } = useAuth();
  const [moods, setMoods] = useState({});

  useEffect(() => {
    if (!user) return;

    const moodRef = collection(db, "trackers", user.uid, "moods");

    const unsubscribe = onSnapshot(moodRef, (querySnapshot) => {
      const moodsData = {};
      querySnapshot.forEach((doc) => {
        moodsData[doc.id] = doc.data();
      });

      setMoods(moodsData);
    });

    return () => unsubscribe();
  }, [user]);

  return { moods };
};
