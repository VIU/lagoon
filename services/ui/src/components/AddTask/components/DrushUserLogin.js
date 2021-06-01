import React from 'react';
import { Mutation } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import ReactSelect from 'react-select';
import Button from 'components/Button';
import { bp, color, fontSize } from 'lib/variables';

const taskDrushUserLogin = gql`
  mutation taskDrushUserLogin($environment: Int!) {
    taskDrushUserLogin(environment: $environment) {
      id
      name
      status
      created
      started
      completed
      remoteId
      command
      service
    }
  }
`;

const DrushUserLogin = ({ pageEnvironment, onCompleted, onError }) => (
  <Mutation
    mutation={taskDrushUserLogin}
    onCompleted={onCompleted}
    onError={onError}
    variables={{
      environment: pageEnvironment.id
    }}
  >
    {(taskDrushUserLogin, { loading, called, error, data }) => {
      return (
        <React.Fragment>
          <div className="envSelect">
            <label id="dest-env">Environment:</label>
            <ReactSelect
              aria-labelledby="dest-env"
              name="dest-environment"
              value={{
                label: pageEnvironment.name,
                value: pageEnvironment.id
              }}
              options={[
                {
                  label: pageEnvironment.name,
                  value: pageEnvironment.id
                }
              ]}
              isDisabled
              required
            />
          </div>
          <Button action={taskDrushUserLogin}>Add task</Button>
          <style jsx>{`
            .envSelect {
              margin: 10px 0;
            }
          `}</style>
        </React.Fragment>
      );
    }}
  </Mutation>
);

export default DrushUserLogin;
