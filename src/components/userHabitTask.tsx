import { responseUser } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";

interface UserHabitTaskProps {
  data: responseUser | null;
}

export default function UserHabitTask(props: UserHabitTaskProps) {
  const sortedItems = useMemo(() => {
    if (!props.data) {
      return [];
    }

    const habits = props.data.habits || [];
    const tasks = props.data.tasks || [];

    const allItems = [...habits, ...tasks];

    // This handles strings, numbers (timestamps), and Firestore Timestamps with a toDate() method.
    const getDate = (dateValue: string | number | { toDate: () => Date }): Date => {
      if (dateValue && typeof (dateValue as { toDate?: () => Date }).toDate === "function") {
        return (dateValue as { toDate: () => Date }).toDate();
      }
      return new Date(dateValue as string | number);
    };

    return allItems.sort((a, b) => {
      const dateA = getDate(a.startDate);
      const dateB = getDate(b.startDate);
      return dateA.getTime() - dateB.getTime();
    });
  }, [props.data]);

  return (
    <div className="max-w-3xl">
      {sortedItems.map((item, index) => (
        <Card
          key={`${item.name}-${index}`}
          className={`mb-4 ${
            index === 0 ? 'mt-3' : ''
          } bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md`}
        >
          <CardContent className="p-6">
            <p className="text-slate-800 dark:text-slate-200 font-medium">
              {item.name}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}