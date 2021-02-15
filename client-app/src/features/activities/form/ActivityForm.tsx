import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if(activity.id.length === 0){
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity);
    }else{
      editActivity(activity);
    }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.currentTarget;
    setActivity({...activity, [name]: value});
  } 

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <Form.Input onChange={handleInputChange} name="title" placeholder="Title" value={activity.title} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <Form.TextArea rows={4} onChange={handleInputChange} name="description" placeholder="Description" value={activity.description} />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <Form.Input onChange={handleInputChange} name="category" placeholder="Category" value={activity.category} />
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          <Form.Input onChange={handleInputChange} name="date" type="datetime-local" placeholder="Date" value={activity.date} />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <Form.Input onChange={handleInputChange} name="city" placeholder="City" value={activity.city} />
        </Form.Field>
        <Form.Field>
          <label>Venue</label>
          <Form.Input onChange={handleInputChange} name="venue" placeholder="Venue" value={activity.venue} />
        </Form.Field>
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
