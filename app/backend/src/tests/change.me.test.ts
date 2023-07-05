import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { mockTeam } from './mocks/team.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  describe('Teams Teste', () => {
    beforeEach(function () { sinon.restore(); });

    it('Seu sub-teste', () => {
      expect(true).to.be.eq(true);
    });
  
    // List
  
    it('Should List All Team', async () => {
      const response = await chai.request(app).get('/teams');
      const { status, body } = response;
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mockTeam);
    });

    it('Should List One Team', async () => {
      const response = await chai.request(app).get('/teams/1');
      const { status, body } = response;
      expect(status).to.equal(200);
      expect(body).to.deep.equal(mockTeam[0]);
    });
  });
});
